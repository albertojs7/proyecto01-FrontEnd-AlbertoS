import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(!!url)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) {
            setLoading(false)
            setData(null)
            setError(null)
            return
        }

        setLoading(true)
        setError(null)

        fetch(url)
            .then(res => {
            if (!res.ok) throw new Error('Error al cargar los datos')
            return res.json()
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [url])

    return { data, loading, error }
    }

    export default useFetch