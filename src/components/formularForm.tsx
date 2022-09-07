import React, { useState } from "react"

interface FormularFormProps {
  handleSubmit: (formular: string) => void
  handleReset: () => void
  isLoading: boolean
}

const FormularForm = ({
  handleSubmit,
  handleReset,
  isLoading,
}: FormularFormProps) => {
  const [query, setQuery] = useState('')
  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleSubmit(query)
  }

  const handleOnReset = () => {
    setQuery('')
    handleReset()
  }

  return (
    <form
      className={`w-full mt-4 flex flex-col gap-1`}
      onSubmit={handleSubmitForm}
      onReset={handleOnReset}
    >
      <div className={`flex flex-row mb-2`}>
        <div className="w-full flex-col">
          <input
            type="text"
            placeholder="Type your math question here"
            className={`input input-bordered w-full max-w-sm flex-1`}
            disabled={isLoading}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label className="label pb-0">
            <span className="label-text-alt">sample: "pi", "What is 1+1?"</span>
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          type="submit"
          className={`btn btn-info ${isLoading && 'loading'}`}
        >
          { !isLoading && 'Let\'s Try!'}
        </button>
        <button
          type="reset"
          className={`btn btn-outline btn-warning ${isLoading && 'loading'}`}
        >
          { !isLoading && 'Reset'}
        </button>
      </div>
    </form>
  )
}

export default FormularForm
