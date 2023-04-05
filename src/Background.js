import { useEffect, useState } from "react";

function Background(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [failed, setFailed] = useState(false);

  //Sets image from pexels api
  useEffect(() => {
    const apiKey = "quqsgNQOcerEqMS9uAvnJvAbKd6reOkiMmXctC16OwSwhi0IZLU5J5mx";
    const query = props.query;
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
        img.onload = () => {
          setFailed(false);
          setImageUrl(img.src);
        } // Save the new image to state
      })
      .catch(err => (console.error(err)), setFailed(true));
    }, [props.query]); //dependency makes sure the useEffect is re-run when the prop changes

  return (
    <>
      {
        failed ?
        <p className="bad-query">No relevant images found</p>
        :
        <div className="background" style={{ backgroundImage: `url(${imageUrl})` }}> </div>
      }
    </>
  );
}

export default Background;