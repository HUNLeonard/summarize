import { useState, useEffect } from "react"
import { Summary } from "../types/types"
import { mockData } from "../data/mockData"

const useSummarizer = () => {
  const [data, setData] = useState<{ summary: Summary }>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setData({ summary: mockData })
    }, 2000)
  }, [])

  return { data, isLoading }
}

export default useSummarizer
