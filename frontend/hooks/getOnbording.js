import { useFindMany, useFindOne } from "@gadgetinc/react";
import { api } from "../api";

export default function getOnbording() {
  const [{ data, fetching, error}] = useFindMany(
    api.OnbOarding,`${id}` , {
        select:{
            id: true,
            task: true,
            description: true,
            status: true,
        }
    
    }
  );
  console.log(data)
  
    // const [{ data, fetching, error}] = useFindMany(
    //     api.onboarding , {
    //         select:{
    //             id: true,
    //             task: true,
    //             description: true,
    //             status: true,
    //         }
        
    //     }
    //   );
    //   console.log(data)
    // const onboarding = (props) => {
    //     const [{ data, error, fetching }, refresh] = useFindMany(api.onboarding);
    //     if (!data) return null;
      
    //     console.log(data.length); //=> a number
      
    //     return <>{data.map((record) => JSON.stringify(record))}</>;
    //   };

    // const handleToggle = (section) => {
    //     setOpenSection(openSection === section ? null : section);
    // };

  return { onbOardingData, fetchingOnboarding };
}
