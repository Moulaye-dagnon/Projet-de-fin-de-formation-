import { toast } from "react-toastify";
import { base_url } from "./config";

export const fetchContact = (data) => {
  fetch(`${base_url}/contactus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((req) => {
      if (!req.ok) throw new Error();
      return req.json();
    })
    .then((res) => {
      toast.success("Message envoyé avec succès, nous vous contacterons dès que possible");
    })
    .catch((e) => {
      toast.error("Une erreur est survenue!");
    });
};
