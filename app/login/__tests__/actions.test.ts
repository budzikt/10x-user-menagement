import { login } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Mock dependencies
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

describe('login action', () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: jest.fn(),
    },
  }

  beforeEach(() => {
    (createClient as jest.Mock).mockResolvedValue(mockSupabase)
    jest.clearAllMocks()
  })

  it('handles auth error correctly', async () => {
    // Setup mock to return error
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: 'Invalid login credentials' },
    })

    const formData = new FormData()
    formData.append('email', 'test@example.com')
    formData.append('password', 'wrongpassword')

    await login(formData)

    // Verify Supabase was called
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'wrongpassword',
    })

    // Verify redirect behavior
    // According to current implementation in actions.ts:
    // if (error) { redirect('/error') }
    expect(redirect).toHaveBeenCalledWith('/error')
  })
})
