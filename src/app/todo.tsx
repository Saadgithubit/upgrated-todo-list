'use client'

import React, { useState } from 'react'

function ToDoList() {
    const [listInput, setlistInput] = useState<string>('')
    const [editInput, seteditInput] = useState<string>('')
    const [isEdit, setisEdit] = useState<number | null>()
    const [isEditList, setisEditList] = useState<string>('')
    const [listItemInput, setlistItemInput] = useState<string>('')
    const [selectVal, setselectVal] = useState<string>('')
    const [showListItem, setshowListItem] = useState(false)
    const [todoList, settodoList] = useState<string[]>([])
    const [todoListItems, settodoListItems] = useState<{ [key: string]: string[] }>({})
    const addList = () => {
        if (listInput) {
            settodoList([...todoList, listInput]);
            let copyListItems = { ...todoListItems }
            copyListItems
            settodoListItems({ ...todoListItems, [listInput]: [] })
            setlistInput('');
        }


    }
    const addListItems = () => {
        if (selectVal && listItemInput) {
            settodoListItems((prev) => ({
                ...prev,
                [selectVal]: [...(prev[selectVal] || []), listItemInput]
            }))
            setlistItemInput('');
        }
    }
    // console.log(todoListItems);

    const edit = (text: string, index: number, item: string) => {
        seteditInput(text)
        setisEditList(item)
        setisEdit(index)

    }
    const update = (index: number, list: string) => {
        console.log(todoListItems);

        let editList = { ...todoListItems }
        todoListItems[list].splice(index, 1, editInput)
        settodoListItems(editList)
        setisEdit(null)
    }
    const deleteList = (index: number, list: string) => {

        let deleteData = { ...todoListItems }
        todoListItems[list].splice(index, 1)
        settodoListItems(deleteData)

    }
    return (
        <div>
            <h1 className='text-center text-4xl font-bold py-8'>Upgrated To Do List</h1>
            {/* Add List  */}
            <div className='border-2 w-1/2 mx-auto space-y-4 text-center py-4'>
                <h1 className='text-center font-bold text-3xl'>Add List</h1>
                <input value={listInput} onChange={(e) => setlistInput(e.target.value)} className='border-2 w-1/2 h-12' type='text' />
                <div className='flex justify-center gap-6'>
                    <button onClick={addList} className='px-12 py-4 rounded-xl block bg-sky-500 text-white'>Add</button>
                    {todoList.length > 0 && <button onClick={() => setshowListItem(true)} className='px-8 py-4 rounded-xl block bg-sky-500 text-white'>Add List Items</button>}
                </div>
            </div>
            {/* Add List Item  */}
            {showListItem && <div className='border-2 w-1/2 flex flex-col items-center mx-auto space-y-4 text-center mt-4 py-4'>
                <h1 className='text-center font-bold text-3xl'>Add List Items</h1>
                <select onChange={(e) => setselectVal(e.target.value)} className='border-2 w-1/2 h-12'>
                    {todoList.map((item) => {
                        return (
                            <option key={item}>{item}</option>
                        )
                    })}
                </select>
                <input value={listItemInput} onChange={(e) => setlistItemInput(e.target.value)} className='border-2 w-1/2 h-12' type='text' />
                <button onClick={addListItems} className='px-12 py-4 rounded-xl block mx-auto bg-sky-500 text-white'>Add List Items</button>
            </div>}

            {todoList.length > 0 && <div className='mt-8 flex flex-wrap gap-4'>
                {todoList.map((item) => {
                    return (
                        <div key={item} className='w-[30%] border-2'>
                            <h3 className='text-2xl text-center'>{item}</h3>
                            <ul className='pl-4'>
                                {todoListItems[item].map((listItem, index) => {
                                    return (
                                        <li key={index} className='flex flex-wrap justify-center items-center py-2 gap-3'>
                                            {index + 1} {listItem}
                                            <button onClick={() => edit(listItem, index, item)} className='bg-green-300 text-white px-6 py-2'>Edit</button>
                                            <button onClick={() => deleteList(index, item)} className='bg-green-300 text-white px-6 py-2'>delete</button>
                                            {isEdit === index && isEditList === item && <div className='w-full flex gap-2 justify-center'>
                                                <input className='border-2 pl-4 w-1/2 h-12' value={editInput} onChange={(e) => seteditInput(e.target.value)} type='text' />
                                                <button onClick={() => update(index, item)} className='bg-green-300 text-white px-6 py-2'>Update</button>
                                            </div>}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default ToDoList