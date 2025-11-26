import Image from "next/image";
import {Button} from "@/app/components/ui/Button"
export default function ProfileBanner({ data }) {
    console.log(data.user.theme)
    const themeColor = data?.user.theme;
  return (


<div className={`text-white rounded-3xl p-20`} style={{backgroundColor:themeColor}}>
      <div className="grid grid-cols-4 gap-4 items-center ">
        <div className="flex flex-col items-center">
          <h3 className="text-h3">{data?.connections ?? 42}</h3>
          <p>Connections</p>
        </div>
        <div className="mx-auto col-span-2">
          <Image
            src={data?.image_url ?? "/placeholder-image.png"}
            alt="Profile Image"
            width={140}
            height={140}
            className="rounded-full border-2 border-white"
          />
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-h3">{data?.notes ?? 42}</h3>
          <p>Notes</p>
        </div>
       
      </div>
      <div className=" flex flex-col justify-center items-center m-8 ">
       <h2 className="text-h2">{data.user.name}</h2>
       <p>singer-songwriter, guitarist</p>
      </div>  
<div className="flex flex-cols gap-8 p-8">
    <Button variant="outline" fullWidth className={"rounded-full bg-[#6C6C6C]/30"}> <span className="flex">connect <Image src={"/icons/plus.svg"} width={20} height={20} className=""></Image> </span></Button>
    <Button variant="outline" fullWidth className={"rounded-full bg-[#6C6C6C]/30"}> Message</Button>
</div>
    </div>
    );  
}