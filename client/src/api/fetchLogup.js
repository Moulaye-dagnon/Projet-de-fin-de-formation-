import { base_url } from "./config";

export const fetchLogup = (isSubmited,setCanSubmit,fields,setIsSubmited,canSubmit,formData,setLoading,setFormError,navigate,formError)=>{
    if (isSubmited === "role") {
        setCanSubmit(true);
      }
  
      if (
        fields.nom &&
        !fields.prenom &&
        !fields.email &&
        !fields.password &&
        !fields.photoProfil &&
        !fields.role &&
        !fields.username &&
        !fields.tel
      ) {
        setIsSubmited("nom");
      } else if (
        fields.prenom &&
        !fields.email &&
        !fields.password &&
        !fields.photoProfil &&
        !fields.role &&
        !fields.username &&
        !fields.tel
      ) {
        setIsSubmited("prenom");
      } else if (
        fields.email &&
        !fields.password &&
        !fields.photoProfil &&
        !fields.role &&
        !fields.username &&
        !fields.tel
      ) {
        setIsSubmited("email");
      } else if (
        fields.password &&
        !fields.photoProfil &&
        !fields.role &&
        !fields.tel
      ) {
        setIsSubmited("password");
      } else if (fields.role && !fields.photoProfil) {
        if (!canSubmit) {
          setIsSubmited("role");
          setCanSubmit(true);
        } else {
          fetch(`${base_url}/logup`, {
            method: "POST",
            body: formData,
          })
            .then((req) => {
              setLoading(true);
              return req.json();
            })
            .then((res) => {
              if (res === "Cet utilisateur existe déjà..." || res.error) {
                setFormError(true)
                setLoading(false);
              } else{
                console.log(res)
                setCanSubmit("");
                setFormError(false)
                setLoading(false);
                navigate("/login");
              }
  
            });
        }
      } else if (
        fields.username &&
        !fields.password &&
        !fields.photoProfil &&
        !fields.role &&
        !fields.tel
      ) {
        setIsSubmited("username");
      } else if (fields.tel && !fields.photoProfil && !fields.role) {
        setIsSubmited("tel");
      } else if (canSubmit === true) {
        console.log("envoyé");
        fetch(`${base_url}/logup`, {
          method: "POST",
          body: formData,
        })
          .then((req) => {
            setLoading(true);
            return req.json();
          })
          .then((res) => {
            if (res === "Cet utilisateur existe déjà..." || res.error) {
              setFormError(true)
              setLoading(false);
            } else{
              console.log(res)
              setCanSubmit("");
              setFormError(false)
              setLoading(false);
              navigate("/login");
            }
          });
      }
}