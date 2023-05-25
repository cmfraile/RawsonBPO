import { useState } from "react";

const useForm = (initialForm:{[key:string]:string}) => {
    const [ formState , setFormState ] = useState(initialForm);
    const onInputChange = ( {target}:{target:{name:string,value:string}} ) => {
        const { name , value } = target ;
        setFormState({...formState,[ name ]:value}) ;
    }
    const onResetForm = () => {setFormState(initialForm)};
    return({ formState , onInputChange , onResetForm , setFormState });
}

/*
    useEffect(() => {
        const def = ({key}:{key:string}) => { (key.toLowerCase() == 'enter') ? useIsEnterKeyPushed(true) : useIsEnterKeyPushed(false) };
        window.addEventListener('keydown',def);
        return () => {window.removeEventListener('keydown',def)}
    })
*/

export default useForm