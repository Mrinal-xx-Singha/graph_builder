import {useQuery} from "@tanstack/react-query"


export const useApps = ()=>{
    return useQuery({
        queryKey:['apps'],
        queryFn:async()=>{
            const response = await fetch('/api/apps')
            if(!response.ok)throw new Error('Network response was not ok')
                return response.json()
        }
    })
}


export const useAppGraph =(appId:string | null)=>{
    return useQuery({
        queryKey:['graph',appId],
        queryFn:async() =>{
            const response =await fetch(`/api/apps/${appId}/graph`)
            if(!response.ok) throw new Error('Network response was not ok')
            return response.json()
        },
        // dont fetch if there is no appId
        enabled:!!appId
    })
}