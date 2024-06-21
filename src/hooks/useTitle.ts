import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} - ERC-4337` : 'ERC-4337'
  }, [])
}

export default useTitle
