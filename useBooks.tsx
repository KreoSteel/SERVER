import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/utils/http'
import type { Book } from '@/utils/interfaces'

export default function useBooks() {
  const queryClient = useQueryClient()
  const { data: books = [] } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await http.get('/books')
      return response.data
    }
  })

  const createBookMutation = useMutation({
    mutationKey: ['createBook'],
    mutationFn: async (book: Book) => {
      const response = await http.post('/books', book)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
    onError: (error) => {
      console.error('Error creating book:', error)
    }
  })

  return {
    books,
    createBookMutation // return the whole object, not just mutate
  }
}