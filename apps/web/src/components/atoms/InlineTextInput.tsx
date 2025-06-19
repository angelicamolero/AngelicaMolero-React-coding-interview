import { useEffect, useRef, useState } from "react"

interface InlineTextProps {
    label: string
    value: string
    type: 'text' | 'email' | 'phone'
    placeholder?: string
    onSave: (newSave:string) => void
}

export const InlineTextInput = (props: InlineTextProps) => {

    const {label, value, type, placeholder, onSave} = props

    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(value)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(editing) {
            inputRef.current.focus()
            setError('')
            setDraft(value)
        }
    }, [])

    const validate = (val:string) => {
        if(type === 'email'){
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            return emailRegex.test(val)
        }
        if(type === 'text'){
            const textRegex = /^[a-zA-Z\s]*$/
            return textRegex.test(val)
        }

        if(type === 'phone') {
          const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
          return phoneRegex.test(val)
        }

    }
    
    const handleSave = () => {
        let msg = 'Invalid Field'
        if(!validate(draft)){
            if(type === 'email') msg= 'invalid mail'
            if(type === 'text') msg= 'invalid text'
            if(type === 'phone') msg= 'invalid phone'
            setError(msg)
            return
        }
        setEditing(false)
        onSave(draft)
    }
    const handleCancel = () => {
        setEditing(false)
        setError('')
    }

    return (
        <div style={{display:'flex'}}>
            <label htmlFor="">
                {label}: 
            </label>

           { editing ? (
                <div style={{ display: 'flex', gap:'8px', flexDirection: 'column', alignItems: 'baseline'}}>
                    <input 
                    type={type}
                    value={draft}
                    ref={inputRef}
                    onChange={(e) => setDraft(e?.target.value)}
                    style={{padding: '8px'}}
                    />
                    { error && <div style={{color: 'red', fontSize: '12px'}}>{error}</div> }
                   <div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                   </div>
                </div>
           ) : (
            <div role='button' onClick={() => setEditing(true)} style={{marginLeft:'5px'}}>
                {value || (placeholder || 'Click to edit')}
            </div>
           )}
        </div>
    )
}