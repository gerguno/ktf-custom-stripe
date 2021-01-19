import React, {createContext, useState, useReducer, useEffect} from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const initialUser = {
        info: {
            name: '',
            email: '',
            phone: '',
            address: {
                city: '',
                country: '',
                line2: '',
                postal_code: ''
            }
        },
        products: []
    }

    const [ user, setUser ] = useState(() => {
        try {
            const userFromStorage = localStorage.getItem('user')
            return userFromStorage
                ?
                    JSON.parse(userFromStorage)
                :
                    initialUser
        } catch (error) {
            console.log(error)
            return initialUser
        }
    })

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    const storeUser = user => {
        setUser(user)
    }
    const resetUser = () => {
        setUser({
            info: {
                name: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    country: '',
                    line2: '',
                    postal_code: ''
                }
            },
            products: []
        })
    }

    return (
        <UserContext.Provider value={{ user, storeUser, resetUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;


