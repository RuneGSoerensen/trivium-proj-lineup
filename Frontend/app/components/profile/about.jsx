export default function About({ data }) {
  return (
    <div>
        <div>
        <h2 className="p-4">About Section</h2>
        <p className="px-8 pb-10">{data?.about ?? "This is a placeholder About section. The user has not provided any information yet."}</p>
    </div>
    <h2 className="p-4">What im looking for</h2>
    <div>
    
    </div>
    </div>
  );
}