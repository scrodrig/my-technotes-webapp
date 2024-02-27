import { Link, Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { selectCurrentToken } from './authSlice'
import usePersist from '../../hooks/usePersist'
import { useRefreshMutation } from './authApiSlice'
import { useSelector } from 'react-redux'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false) //! Strick Mode

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
        useRefreshMutation()

    useEffect(() => {
        if (
            effectRan.current === true ||
            // eslint-disable-next-line no-undef
            process.env.NODE_ENV !== 'development' ||
            import.meta.env.MODE !== 'development'
        ) {
            // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const response = await refresh()
                    const { data } = response
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => (effectRan.current = true)

        // eslint-disable-next-line
    }, [])

    let content
    if (!persist) {
        // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) {
        //persist: yes, token: no
        console.log('loading')
        content = <p>Loading...</p>
    } else if (isError) {
        //persist: yes, token: no
        console.log('error')
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) {
        //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}
export default PersistLogin
