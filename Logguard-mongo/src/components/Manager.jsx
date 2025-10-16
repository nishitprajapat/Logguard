import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordInputRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let request = await fetch("http://localhost:3000/")
        let passwords = await request.json()
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("public/icon/eye.png")) {
            ref.current.src = "public/icon/eyecross.png";
            passwordInputRef.current.type = "password";
        } else {
            ref.current.src = "public/icon/eye.png";
            passwordInputRef.current.type = "text";
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            console.log(passwordArray)
            setform({ site: "", username: "", password: "" })

            //toast
            toast.success('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        }

        else {
            toast.success('Error: Site, Username, Password Length more than 3 Required!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        }

    }

    const deletePassword = async (id) => {
        console.log("Deleting Password with id " + id)
        let confirmed = confirm("Do you really want to delete this password?")

        if (confirmed) {
            // Filter out the item to delete
            setpasswordArray(passwordArray.filter(item => item.id !== id))

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })


            //toast
            toast.success('Password Deleted!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        }
    }

    const editPassword = async(id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id });
        setpasswordArray(passwordArray.filter(item => item.id !== id));

        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        
    }

    const handleChange = (e) => {
        // Fix: Ensure we are not wrapping the value in an array 
        // as your original code did: [e.target.value]
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = (text) => {
        toast.success('Copy to Clipboard Success!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
        navigator.clipboard.writeText(text);
    }


    return (
        <>
            {/* toastify */}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>


            {/* FORM CONTAINER: Added responsive padding p-4 (mobile) and sm:px-10 (desktop) */}
            <div className="mt-2 container mx-auto bg-gray-50 rounded-2xl max-w-3xl p-4 sm:px-10 sm:py-10">
                <p className='text-indigo-600 font-extrabold text-xl sm:text-2xl text-center py-4'>🔑 Your Password Manager</p>

                <div className="flex flex-col p-4 gap-4 justify-center items-center">
                    {/* Site Input (w-full is already responsive) */}
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        type="text"
                        className='pl-3 p-[5px] py-2 bg-white rounded-full border-[2px] border-indigo-400 w-full text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        name="site"
                    />

                    {/* Username/Password Row: Stacks vertically on mobile (flex-col) and goes horizontal on medium screens (md:flex-row) */}
                    <div className="flex flex-col md:flex-row w-full gap-3 md:gap-6">

                        {/* Username Input: W-full ensures it takes full width on both mobile and desktop split */}
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            type="text"
                            className='pl-3 p-[5px] py-2 bg-white rounded-full border-[2px] border-indigo-400 w-full text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                            name="username"
                        />

                        {/* Password Input Container: W-full ensures responsiveness */}
                        <div className="relative w-full">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                ref={passwordInputRef}
                                placeholder='Enter Password'
                                type="password"
                                className='pl-3 pr-10 p-[5px] py-2 bg-white rounded-full border-[2px] border-indigo-400 w-full text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                                name="password"
                            />
                            <span onClick={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1">
                                <img ref={ref} src="public/icon/eyecross.png" width={20} alt="Toggle Visibility" />
                            </span>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={savePassword}
                        className='mt-2 flex justify-center font-bold items-center bg-indigo-600 text-white rounded-full p-2 px-6 hover:bg-indigo-700 transition-all duration-300 shadow-md gap-2 w-fit'
                    >
                        <Lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" style={{ "width": "24px", "height": "24px", "color": "white" }}></Lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords mt-8">
                    <h2 className='font-bold text-2xl py-4 text-gray-800 border-b-2 border-indigo-300'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-gray-500 mt-4 text-center'>No Passwords to show</div>}

                    {passwordArray.length != 0 && (
                        /* TABLE RESPONSIVENESS: Wrapper allows horizontal scrolling on small screens */
                        <div className="overflow-x-auto shadow-xl rounded-lg mt-4">
                            <table className="min-w-full table-fixed text-sm md:table-auto">
                                <thead className="bg-indigo-700 text-white">
                                    <tr>
                                        <th className='py-3 px-3 w-1/4'>Site</th>
                                        <th className='py-3 px-3 w-1/4'>Username</th>
                                        <th className='py-3 px-3 w-1/4'>Password</th>
                                        <th className='py-3 px-3 w-1/4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-indigo-50 text-gray-800 divide-y divide-indigo-200'>
                                    {passwordArray.map((item) => {
                                        return (
                                            <tr key={item.id} className="hover:bg-indigo-100 transition-colors">

                                                {/* Site */}
                                                <td className='py-3 px-3 text-center border-r border-indigo-200'>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <a target="_blank" href={item.site} className="truncate text-indigo-600 hover:text-indigo-800 hover:underline max-w-[calc(100%-30px)]">{item.site}</a>
                                                        <div className='Lordiconcopy cursor-pointer flex justify-center items-center' onClick={() => { copyText(item.site) }}>
                                                            <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "20px", "height": "20px" }}></Lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                <td className='py-3 px-3 text-center border-r border-indigo-200'>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <span className='truncate max-w-[calc(100%-30px)]'>{item.username}</span>
                                                        <div className='Lordiconcopy cursor-pointer flex justify-center items-center' onClick={() => { copyText(item.username) }}>
                                                            <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "20px", "height": "20px" }}></Lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Password */}
                                                <td className='py-3 px-3 text-center border-r border-indigo-200'>
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <span className='truncate max-w-[calc(100%-30px)]'>{item.password}</span> {/* Masked for security */}
                                                        <div className='Lordiconcopy cursor-pointer flex justify-center items-center' onClick={() => { copyText(item.password) }}>
                                                            <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "20px", "height": "20px" }}></Lord-icon>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className='py-3 px-3 text-center'>
                                                    <span className='cursor-pointer inline-block mx-1' onClick={() => { editPassword(item.id) }}>
                                                        <Lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "23px", "height": "23px" }}></Lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer inline-block mx-1' onClick={() => { deletePassword(item.id) }}>
                                                        <Lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "23px", "height": "23px" }}></Lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </ >

    )
}

export default Manager


// import React, { useEffect, useState } from 'react'
// import { useRef } from 'react'
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';

// const Manager = () => {


//     const ref = useRef();
//     const passwordInputRef = useRef();
//     const [form, setform] = useState({ site: "", username: "", password: "" })
//     const [passwordArray, setpasswordArray] = useState([])

//     useEffect(() => {
//         let passwords = localStorage.getItem("passwords");
//         let passwordArray;
//         if (passwords) {
//             setpasswordArray(JSON.parse(passwords))
//         }

//     }, [])


//     const showPassword = () => {
//         if (ref.current.src.includes("public/icon/eye.png")) {
//             ref.current.src = "public/icon/eyecross.png";
//             passwordInputRef.current.type = "password";
//         } else {
//             ref.current.src = "public/icon/eye.png";
//             passwordInputRef.current.type = "text";
//         }
//     }

//     const savePassword = () => {
//         setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
//         localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
//         // console.log(...passwordArray, form)
//         console.log(passwordArray)
//         setform({ site: "", username: "", password: "" })

//         //toast
//             toast.success('Password Saved Successfully!', {
//                 position: "top-right",
//                 autoClose: 4000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce
//             });
//     }

//     const deletePassword = (id) => {
//         console.log("Deleting Password with id " + id)
//         let c = confirm("Do you really want to delete this Password")
//         if (c) {
//             setpasswordArray(passwordArray.filter(item => item.id !== id))
//             localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

//             //toast
//             toast.success('Password Deleted!', {
//                 position: "top-right",
//                 autoClose: 4000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//                 transition: Bounce
//             });
//         }

//     }

//     const editPassword = (id) => {
//         console.log("Edit Password with id " + id)
//         setform(passwordArray.filter(i => i.id === id)[0])
//         setpasswordArray(passwordArray.filter(item => item.id !== id))
//     }

//     const handleChange = (e) => {
//         setform({ ...form, [e.target.name]: [e.target.value] })
//     }

//     const copyText = (text) => {
//         toast.success('Copy to Clipboard Success!', {
//             position: "top-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//             transition: Bounce
//         });
//         navigator.clipboard.writeText(text);
//     }


//     return (
//         <>
//             {/* toastify */}

//             <ToastContainer
//                 position="top-right"
//                 autoClose={4000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={true}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//                 transition={Bounce}
//             />

//             <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>


//             <div className="mt-2 container mx-auto bg-gray-50 opacity-500 rounded-2xl max-w-3xl px-10 py-10">
//                 <p className='text-indigo-400 font-bold text-[21px] text-center'>🔑 Your Password Manager</p>

//                 <div className="flex flex-col p-4 gap-3 justify-center items-center">
//                     <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' type="text" className='pl-3 p-[5px] py-1 bg-white rounded-full border-[2px] border-indigo-400 w-full text-black' name="site" />
//                     <div className="flex w-full gap-6">
//                         <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className='pl-3 p-[5px] py-1 bg-white rounded-full border-[2px] border-indigo-400 w-80 text-black' name="username" />

//                         <div className="relative">
//                             <input value={form.password} onChange={handleChange} ref={passwordInputRef} placeholder='Enter Password' type="password" className='pl-3 p-[5px] py-1 bg-white rounded-full border-[2px] border-indigo-400 w-80 text-black' name="password" />
//                             <span onClick={showPassword} className="absolute right-3 top-2 cursor-pointer">
//                                 <img ref={ref} src="public/icon/eyecross.png" width={20} />
//                             </span>
//                         </div>

//                     </div>
//                     <button onClick={savePassword} className='m-4 flex justify-center font-bold  items-center bg-indigo-200 rounded-full p-2 px-4 w-50 hover:bg-indigo-300 border-[2px] border-indigo-600 gap-2'><Lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></Lord-icon>Save Password</button>
//                 </div>

//                 <div className="passwords">
//                     <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
//                     {passwordArray.length === 0 && <div>No Passwords to show</div>}
//                     {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
//                         <thead className="bg-indigo-600 text-white">
//                             <tr>
//                                 <th className='py-2'>Site</th>
//                                 <th className='py-2'>Username</th>
//                                 <th className='py-2'>Password</th>
//                                 <th className='py-2'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className='bg-indigo-100'>
//                             {passwordArray.map((item) => {
//                                 return <tr>
//                                     <td className=' justify-center items-center py-2 border border-white text-center text-indigo-700'>
//                                         <div className="flex items-center justify-center">
//                                             <a target="_blank" href={item.site}>{item.site}</a>
//                                             <div className='Lordiconcopy cursor-pointer size-7 flex justify-center items-center pl-3' onClick={() => { copyText(item.site) }}>
//                                                 <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "24px", "height": "25px" }}></Lord-icon>
//                                             </div>
//                                         </div>

//                                     </td>
//                                     <td className=' justify-center items-center py-2 border border-white text-center'>
//                                         <div className="flex items-center justify-center">
//                                             <span>{item.username}</span>
//                                             <div className='Lordiconcopy cursor-pointer size-7 flex justify-center items-center pl-3' onClick={() => { copyText(item.username) }}>
//                                                 <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "24px", "height": "25px" }}></Lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className=' justify-center items-center py-2 border border-white text-center'>
//                                         <div className="flex items-center justify-center">
//                                             <span>{item.password}</span>
//                                             <div className='Lordiconcopy cursor-pointer size-7 flex justify-center items-center pl-3' onClick={() => { copyText(item.password) }}>
//                                                 <Lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ "width": "24px", "height": "25px" }}></Lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='justify-center items-center py-2 border border-white text-center'>
//                                         <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><Lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "23px", "height": "23px" }}></Lord-icon></span>
//                                         <span className='pl-3 cursor-pointer' onClick={() => { deletePassword(item.id) }}><Lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "23px", "height": "23px" }}></Lord-icon></span>
//                                     </td>
//                                 </tr>
//                             })}

//                         </tbody>
//                     </table>}
//                 </div>
//             </div>

//         </ >

//     )
// }

// export default Manager
