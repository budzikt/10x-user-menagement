import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Avatar from '../avatar'
import { createClient } from '@/lib/supabase/client'

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}))

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

describe('Avatar', () => {
  const mockSupabase = {
    storage: {
      from: jest.fn().mockReturnThis(),
      download: jest.fn(),
      upload: jest.fn(),
    },
  }
  const mockOnUpload = jest.fn()

  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue(mockSupabase)
    jest.clearAllMocks()
    
    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url')
    global.alert = jest.fn()
  })

  it('handles file upload correctly', async () => {
    // Mock upload response
    mockSupabase.storage.upload.mockResolvedValue({
        data: { path: 'test-path.png' },
        error: null
    })

    render(<Avatar uid="123" url={null} size={150} onUpload={mockOnUpload} />)

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const input = screen.getByLabelText(/upload avatar/i)

    // Simulate upload
    // We wrap in act if it causes state updates, but fireEvent usually handles it.
    // However, since the component has async logic, we need to wait.
    
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } })
    })

    // Check if upload was called
    expect(mockSupabase.storage.upload).toHaveBeenCalled()
    
    // The component sets uploading=true then awaits, then false. 
    // Capturing "Uploading..." state is tricky if the promise resolves instantly in the mock.
    // But we can check that onUpload was called.
    expect(mockOnUpload).toHaveBeenCalled()
  })
})
