import React from 'react'
import { useSelector } from 'react-redux'
import loading from '../../assets/User/images/loading.gif'
import './style.css'

function Loading() {

    const { isLoading } = useSelector((state) => {
        return state.LoadingReducer;
    })

    return (
        <>
            {isLoading ? (
                <div className='loading__content'>
                    <img className='loading__img' src={loading} alt="..." />
                </div>
            ) : null}
        </>
    )
}

export default Loading