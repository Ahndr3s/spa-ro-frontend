import axios from "axios";
import getEnvVariables from "../helpers/getEnvVariables";
import { useState, useEffect } from "react";

export const ProductMatrix = () => {
  const [posts, setPosts] = useState([]);
  const { VITE_INST_TOKEN } = getEnvVariables();

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await axios.get(
          "https://graph.instagram.com/me/media",
          {
            params: {
              fields: "id,media_type,media_url",
              access_token: VITE_INST_TOKEN,
            },
          }
        );

        setPosts(response.data.data.slice(0, 12));
      } catch (error) {
        console.error("Error al obtener el feed de Instagram:", error);
      }
    };

    fetchInstagramFeed();
  }, []);

  return (
    <>
      <div className="instMatrix-container">
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            {post.media_type === "IMAGE" && (
              <>
                <img
                  src={post.media_url}
                  className="instPic"
                  onClick={() => alert('Lead somewhere')}
                  alt={post.caption}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );

};
