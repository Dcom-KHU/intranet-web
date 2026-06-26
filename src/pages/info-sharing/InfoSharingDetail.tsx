import { useParams } from "react-router-dom";

const InfoSharingDetail = () => {
    const { id } = useParams();
    return(
        <div className="px-4 py-8 sm:px-6 lg:px-20">
            <p>info-sharing detail post</p>
            <span>{ id }</span>
        </div>
    );
}

export default InfoSharingDetail