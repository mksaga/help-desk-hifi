import 'bulma/css/bulma.css';

import { FormEvent } from 'react'

export default function Home() {

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString)

    const response = await fetch(`/api/tickets`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    })
    
    const data = await response.json()
  }

  return (
    <main className="container p-6 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
      <div>
        <h2 className="is-size-2">Create a new ticket</h2>
      </div>
      <form onSubmit={submitForm} className="form pt-2 is-flex is-flex-direction-column is-align-items-center">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" name="name" required/>
          </div>
        </div> 
        <div className="field mt-3">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" name="email" required/>
          </div>
        </div> 
        <div className="field mt-3">
          <label className="label">Description</label>
          <div className="control">
          <textarea className="textarea" type="textarea" name="description" rows="4" />
          </div>
        </div> 
        <button className="button is-primary mt-2" type="submit">Submit</button>
      </form>
    </main>
  )
}
