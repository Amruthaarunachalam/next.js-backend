import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LearningCard } from '@/app/components/learningcard'

describe('LearningCard', () => {
  it('renders the title and description', () => {
    render(
      <LearningCard
        title="React Basics"
        description="Learn the fundamentals of React"
        bullets={['Components', 'Props', 'State']}
      />
    )

    expect(screen.getByText('React Basics')).toBeInTheDocument()
    expect(screen.getByText('Learn the fundamentals of React')).toBeInTheDocument()
  })

  it('renders one list item per bullet', () => {
    render(
      <LearningCard
        title="React Basics"
        description="Learn the fundamentals of React"
        bullets={['Components', 'Props', 'State']}
      />
    )

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(screen.getByText('Components')).toBeInTheDocument()
    expect(screen.getByText('Props')).toBeInTheDocument()
    expect(screen.getByText('State')).toBeInTheDocument()
  })

  it('does not render an image when imgUrl is not provided', () => {
    render(
      <LearningCard
        title="React Basics"
        description="Learn the fundamentals of React"
        bullets={['Components']}
      />
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders an image with the correct src and alt when imgUrl is provided', () => {
    render(
      <LearningCard
        title="React Basics"
        description="Learn the fundamentals of React"
        bullets={['Components']}
        imgUrl="/images/react.png"
      />
    )

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/images/react.png')
    expect(image).toHaveAttribute('alt', 'React Basics')
  })
})