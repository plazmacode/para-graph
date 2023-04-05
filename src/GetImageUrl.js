import { useEffect, useState } from "react";

function GetImageUrl() {
  const [imageUrl, setImageUrl] = useState("");

  //Sets image from pexels api
  useEffect(() => {
    const apiKey = "quqsgNQOcerEqMS9uAvnJvAbKd6reOkiMmXctC16OwSwhi0IZLU5J5mx";
    const query = ["forest"];
    fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: {
        Authorization: apiKey
      }
    })
      .then(res => res.json())
      .then(data => {
        // Copy the image to a new Image object
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.photos[0].src.large2x;
        img.onload = () => setImageUrl(img.src); // Save the new image to state
      })
      .catch(err =>console.error(err));
    }, []);

  return (
    <div className="background" style={{ backgroundImage: `url(${imageUrl})`, color:"red"}}>
    </div>
  );
}

export default GetImageUrl;