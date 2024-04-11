import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {

    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set("file", files[0]);

            const uploadPromise = fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then((response) => {
                if (response.ok) {
                    return response.json().then((link) => {
                        setLink(link);
                    });
                }
                throw new Error("Something went wrong");
            });

            await toast.promise(uploadPromise, {
                loading: "Uploading...",
                success: "Upload Complete!",
                error: "Upload Error",
            });
        }
    }
    return (
        <>
            {link && (
                <Image
                    className="rounded-lg h-full w-full mb-1"
                    src={link}
                    width={250}
                    height={250}
                    alt={"avatar"}
                ></Image>
            )}
            {!link && (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No Image  
                </div>
            )}
            <label className="m-0">
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
                    Change&nbsp;image
                </span>
            </label>
        </>
    );
}