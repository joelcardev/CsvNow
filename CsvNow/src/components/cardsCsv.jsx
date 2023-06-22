import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function CardCsv({ data }) {
 
  if (data != undefined && data.length === 0) {
    return (
      <>
        <h2 style={{ marginTop: "5%" }}>No CSV files available.</h2>
      </>
    );
  }

  return (
    <>
      {data.map((item, index) => (
        <Accordion key={index} style={{ backgroundColor: "#d2e0dd" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <strong>Name file:</strong> {item.nameFile}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {item.data && Object.keys(item.data[0]).map((key, index) => (
                      <TableCell key={index}>
                        <strong>{key}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.data && item.data.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default CardCsv;
