import ProfileBanner from "@/app/components/profile/profile-banner";
import About from "@/app/components/profile/about";
export default async function Page({ params }) {
  const { id } = await params; 
  const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${id}`);
  if (!res.ok) {
    return (
      <div>
        <p>Failed to load user.</p>
      </div>
    );
  }
  const data = await res.json();
  console.log(data)
  return (
    <div className="m-10">
    <ProfileBanner data={data}></ProfileBanner>
    <div className=" bg-neutral-100 rounded-3xl mt-8">
    <div className="flex flex-cols p-8">
      <div className="flex justify-center w-1/2 border-r-1 border-gray-300">
    <button className="text-h2">About</button>
    </div>
    <div className="flex justify-center w-1/2 ">
    <button className="text-h2">Notes</button>
    </div>
    </div>
    <About data={data}></About>
    

    </div>
    
</div>
  );
}

