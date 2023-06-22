import { Button, Container } from "@mui/material";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCsv from "../../components/cardsCsv";
import {
  showError,
  showInfo,
  showSuccess,
} from "../../components/messages/messages";
import { getData, postData } from "../../requests/requisições";
import "./Home.css";
function Home() {
  const [files, setFiles] = useState([]);

  const [filesJson, setFilesJson] = useState([]);

  let filesRedux = useSelector((state) => state.reducer.files);

  let keyWord = useSelector((state) => state.reducer.keyWord);

  const dispatch = useDispatch();

  useEffect(() => {
    if (filesJson.length == 0) {
      getApiFilesByUser();
    }
  }, []);

  useEffect(() => {
    if (keyWord != null) {
      searchFiles();
    }
  }, [keyWord]);

  function setValuesCameApi(result) {
    let newFiles = result.filter((data) => data.id !== 1);
    setFilesJson((prevFiles) => [...prevFiles, ...newFiles]);
  }


  // I TRY BUT NOT HAD TIME TO LOOK FOR WHY MY API IS CALLING 2 TIMES, its life.
  async function getApiFilesByUser() {
    // I SET value just test, because not do system of auth to many users
    let idUser = 1;
    await getData(
      `/files/?idUser=${idUser}`,
      setValuesCameApi,
      showError,
      "apiFileCsv"
    );
  }

  const getFile = (event) => {
    let selectedFiles = Array.from(event.target.files);
    saveFileCsv(selectedFiles);
  };

  async function parseFile(file) {
    if (file[0].type !== "text/csv") {
      return showError("Invalid file type");
    }

    return new Promise((resolve, reject) => {
      Papa.parse(file[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          resolve(results.data);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  async function saveFileCsv(file) {
    const fileSaved = await parseFile(file);

    let fileToSave = {
      idUser: 1,
      nameFile: file[0].name,
      data: fileSaved,
    };

    if (fileSaved == null) {
      return;
    }

    setFilesJson((prevFiles) => [...prevFiles, fileToSave]);

    await postData("/files", fileToSave, showSuccess, showError, "apiFileCsv");
    showSuccess("File saved successfully");
  }

  async function searchFiles() {
    if (!keyWord) {
      setFilesJson([]);
      getApiFilesByUser();
      showInfo("No files found");
      return;
    }

    if (filesJson != null && filesJson.length > 0) {
      let newFiles = [];

      newFiles = filesJson.filter((file) => file.nameFile === keyWord);
      if (newFiles.length > 0) {
        setFilesJson(newFiles);
        return;
      }

      newFiles = filesJson.filter((file) => {
        return file.data.some((row) => {
          return Object.values(row).some((value) => value.includes(keyWord));
        });
      });

      if (newFiles.length > 0) {
        setFilesJson(newFiles);
        newFiles = [];
        return;
      }
      setFilesJson([]);
      getApiFilesByUser();
      showInfo("No files found");
    }
  }

  return (
    <Container className="mainGrid">
      <h1>Hello! Here you can to load and to view easily your Csv files.</h1>
      <Button variant="contained" component="label">
        Upload CSV file
        <input type="file" onChange={getFile} accept=".csv" hidden />
      </Button>
      <div className="divCards">{<CardCsv data={filesJson} />}</div>
    </Container>
  );
}

export default Home;
