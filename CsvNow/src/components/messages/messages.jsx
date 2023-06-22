import React from "react";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";

export function showError(text) {
  toast.error(text, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
}

export function showSuccess(text) {
  toast.success(text, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
}

export function showInfo(text) {
  toast.info(text, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
}
