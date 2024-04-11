export default function SuccessBox({ children }) {
    return (
        <div className="text-center bg-green-100 rounded-lg border border-green-400 p-4 ">
            {children}
        </div>
    );

}