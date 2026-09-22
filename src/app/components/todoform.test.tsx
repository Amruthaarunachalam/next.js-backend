import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoForm from './todoform'

describe("presence of form fields", () => {
  beforeEach(() => {
    render(
      <TodoForm
        editingID={null}
        title=""
        setTitle={vi.fn()}
        description=""
        setDescription={vi.fn()}
        status={false}
        setStatus={vi.fn()}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    )
  })

  it("presence of title text box", () => {
    expect(screen.getByPlaceholderText(/title of To-Do task/i)).toBeInTheDocument()
  })

  it("presence of description text box",() =>{
    expect(screen.getByPlaceholderText(/Description.../i)).toBeInTheDocument()
  })

  it("presence of select box",()=>{
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  })
})