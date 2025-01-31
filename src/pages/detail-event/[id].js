import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function DetailEvent() {
  const [dataById, setDataById] = useState({})
  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    console.log(id, "=== APA SIH");
    getById()
  }, [id])

  const getById = async () => {
    try {
        const data = await fetch (`/api/event-id/${id}`)
        const result = await data.json()
        setDataById(result.data)
    } catch (error) {
        console.log(error," ===> P2");
        
    }
  }
    return(
        <>
        <h1> This is Detail Event {id} </h1>
        <p>{JSON.stringify(dataById)}</p>
        </>
    )
}