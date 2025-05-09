/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
//config
import { uploads } from "../utils/config";

const PhotoItem = ({ photo }) => {
    return (
        <div>
            {photo.image && (
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
            )}
            <div className="text-sm my-3">
                <p className="text-neutral-700"><Link to={`/users/${photo.userId}`} className="font-bold">{photo.userName}</Link> - {photo.title}</p>
            </div>
        </div>
    );
};

export default PhotoItem;