import { Image } from "../type"

export const uploadImage = async (file: File, userId: string) => {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    if (file) {
        formData.append('image', file)
    }
    formData.append('user_id', userId)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images`, {
            method: 'POST',
            headers: {
                Authorization: `${token}`
            },
            body: formData,
            credentials: 'include'
        })
        const data: string = await response.json()
        return {
            success: response.ok,
            data: data
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error getting categories: ${err.message}`)
        }
        return { success: false, data: 'An error occurred' }
    }
}

export const deleteImage = async (id: number) => {
    const token = localStorage.getItem('access_token')
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            credentials: 'include'
        })
        const data: string = await response.json()
        if (response.ok) {
            return {
                success: response.ok,
                data: data
            }
        }
    } catch (err) {
        console.error('Error deleting image: ', err)
        return { success: false, data: 'An error occurred' }
    }
}

export const updateImage = async (id: number, updateData: Partial<Image>) => {
    const token = localStorage.getItem('access_token')
    const requestConfig: RequestInit = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(updateData),
        credentials: 'include'
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}images/${id}`, requestConfig)
        const responseData: string = await response.json()
        return {
            success: response.ok,
            data: responseData
        }
    } catch (err) {
        console.log(`An error occurred: ${err}`)
        return { success: false, data: 'An error occurred' }
    }
}

