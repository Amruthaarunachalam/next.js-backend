import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import TodoForm from '@/app/components/todoform'

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

  it("presence of description text box", () => {
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument()
  })

  it("presence of select box", () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})

describe("TodoForm user interaction", () => {
  it('when user types in title field', async () => {
    const setTitle = vi.fn()

    render(
      <TodoForm
        editingID={null}
        title=""
        setTitle={setTitle}
        description=""
        setDescription={vi.fn()}
        status={false}
        setStatus={vi.fn()}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    )

    const titleInputField = screen.getByPlaceholderText(/title of To-Do task/i)
    await userEvent.type(titleInputField, 'B')
    expect(setTitle).toHaveBeenCalledWith('B')
  })

  it('when submit button is clicked', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(
      <TodoForm
        editingID={null}
        title="Buy milk"
        setTitle={vi.fn()}
        description=""
        setDescription={vi.fn()}
        status={false}
        setStatus={vi.fn()}
        onSubmit={onSubmit}
        onReset={vi.fn()}
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Create To-Do' })
    await userEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('when reset button is clicked', async () => {
    const onReset = vi.fn()

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
        onReset={onReset}
      />
    )

    const resetButton = screen.getByRole('button', { name: 'Cancel' })
    await userEvent.click(resetButton)
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('when user types in description field', async () => {
    const setDescription = vi.fn()

    render(
      <TodoForm
        editingID={null}
        title=""
        setTitle={vi.fn()}
        description=""
        setDescription={setDescription}
        status={false}
        setStatus={vi.fn()}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    )

    const descriptionField = screen.getByPlaceholderText(/Description/i)
    await userEvent.type(descriptionField, 'X')
    expect(setDescription).toHaveBeenCalledWith('X')
  })

  it('when user selects "Completed" from the status dropdown', async () => {
    const setStatus = vi.fn()

    render(
      <TodoForm
        editingID={null}
        title=""
        setTitle={vi.fn()}
        description=""
        setDescription={vi.fn()}
        status={false}
        setStatus={setStatus}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    )

    const statusSelect = screen.getByRole('combobox')
    await userEvent.selectOptions(statusSelect, 'true')
    expect(setStatus).toHaveBeenCalledWith(true)
  })

  it('when user selects "Pending" from the status dropdown', async () => {
    const setStatus = vi.fn()

    render(
      <TodoForm
        editingID={null}
        title=""
        setTitle={vi.fn()}
        description=""
        setDescription={vi.fn()}
        status={true}
        setStatus={setStatus}
        onSubmit={vi.fn()}
        onReset={vi.fn()}
      />
    )

    const statusSelect = screen.getByRole('combobox')
    await userEvent.selectOptions(statusSelect, 'false')
    expect(setStatus).toHaveBeenCalledWith(false)
  })
})