import { render, screen, waitFor } from '@testing-library/react'
import AccountForm from '../account-form'
import { createClient } from '@/lib/supabase/client'

// Mock dependencies
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}))

// Mock Avatar to simplify test and avoid its internal logic
jest.mock('../avatar', () => {
  return function MockAvatar() {
    return <div data-testid="mock-avatar">Avatar</div>
  }
})

// Mock generic alert since the component uses it
global.alert = jest.fn()

describe('AccountForm', () => {
  const mockUser = {
    id: '123',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '',
  } as any

  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    upsert: jest.fn(),
  }

  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue(mockSupabase)
    jest.clearAllMocks()
  })

  it('renders initial data correctly', async () => {
    // Setup mock response
    mockSupabase.single.mockResolvedValue({
      data: {
        full_name: 'John Doe',
        username: 'johndoe',
        website: 'https://example.com',
        avatar_url: 'avatar.png',
      },
      error: null,
      status: 200,
    })

    render(<AccountForm user={mockUser} />)

    // Check email (passed via props) - populate immediately
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveValue('test@example.com')
    expect(emailInput).toBeDisabled()

    // Wait for data fetch and state update
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe')
    })

    expect(screen.getByLabelText(/username/i)).toHaveValue('johndoe')
    expect(screen.getByLabelText(/website/i)).toHaveValue('https://example.com')
  })
})
