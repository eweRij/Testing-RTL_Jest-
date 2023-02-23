import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import MovieForm from '../components/movie-form';
global.fetch =require('jest-fetch-mock')
const emptyMovie={title:"",description:""};
const movie={id:3,title:"pierwszy",description:"opis pierwszego"}

describe("test MovieForm component",()=>{
    test("should display form elements",()=>{//sprawdzamy obecnosc waznych elementow
        const {getByLabelText,getByRole}=render(<MovieForm movie={emptyMovie}/>);
        expect(getByLabelText(/title/i)).toBeTruthy()
        expect(getByLabelText(/description/i)).toBeTruthy()
        expect(getByRole("button",{name:/create/i})).toBeTruthy()

    })
    test("should display movie info value",()=>{//sprawdzamy obecnosc waznych elementow
        const {getByLabelText,getByRole,debug}=render(<MovieForm movie={movie}/>);///pamietajmy o  destrukturyzacji w tescie!!
        debug(getByLabelText(/title/i))//debug konsoluje nam to co chcemy!!
        expect(getByLabelText(/title/i).value).toBe(movie.title)//formularze!! sprawdzamy value pól
        expect(getByLabelText(/description/i).value).toBe(movie.description)//!!!!
        expect(getByRole("button",{name:/update/i})).toBeTruthy()

    })

    // test(" button should trigger update function",async()=>{//sprawdzamy obecnosc waznych elementow
    //     const updateMovie=jest.fn().mockImplementation(()=>{
    //         Promise.resolve({
    //                     json:()=>Promise.resolve(movie)
    //                 })
            
    //     })//?
    //     // jest.spyOn(global,"fetch").mockImplementation(()=>{
    //     //     Promise.resolve()
            
    //     // })//cos nie dziala dlaczego??
    //     // const updateMovie=jest.fn()
    //     // fetch.mockResponseOnce(JSON.stringify(movie))
    //     // const updateMovie=jest.fn();
    //     // jest.spyOn(global,"fetch").mockImplementation(()=>{
    //     //     Promise.resolve({
    //     //         json:()=>Promise.resolve(movie)
    //     //     })
    //     // })
    //     // const updateMovie=jest.fn();
    //     // fetch.mockResponseOnce(JSON.stringify(movie))
    //     const {getByRole}=render(<MovieForm movie={movie} update={updateMovie}/>);///pamietajmy o  destrukturyzacji w tescie!!
    //     const submitBtn=getByRole("button",{name:/update/i});
    //     fireEvent.click(submitBtn);
    //     //zamiasdt setTimeout , mozna wykoszystac async wait!!, klikania its sa asynch!!
    //     // await wait(()=>{
    //     // expect(updateMovie).toBeCalledTimes(1)//ta funkcja akurat jest promisowa , wiec trzeba tez zmokowac tego fetch promise!!
    //     // })
    //    setTimeout(()=>{
    //     expect(updateMovie).toBeCalledTimes(1)
    //    })

    // })
    test(" button shouldnt trigger Api when empty form",async()=>{//sprawdzamy obecnosc waznych elementow
        const updateMovie=jest.fn();
        fetch.mockResponseOnce(JSON.stringify(movie))//korzysta z biblio jest-fetch-mock
        // jest.spyOn(global,"fetch").mockImplementation(()=>{
        //     Promise.resolve()
            
        // })//cos nie dziala dlaczego??
        const {getByRole}=render(<MovieForm movie={emptyMovie} update={updateMovie}/>);///pamietajmy o  destrukturyzacji w tescie!!
        const submitBtn=getByRole("button",{name:/create/i});
        fireEvent.click(submitBtn);
        //zamiasdt setTimeout , mozna wykoszystac async wait!!, klikania its sa asynch!!
        // await wait(()=>{
        // expect(updateMovie).toBeCalledTimes(1)//ta funkcja akurat jest promisowa , wiec trzeba tez zmokowac tego fetch promise!!
        // })
       setTimeout(()=>{
        expect(updateMovie).toBeCalledTimes(0)
       })

    })

    //   test("should trigger Api when click create new movie btn",async()=>{//sprawdzamy obecnosc waznych elementow
    //     const movieCreated=jest.fn();
    //     fetch.mockResponseOnce(JSON.stringify(movie))//korzysta z biblio jest-fetch-mock
    //     // jest.spyOn(global,"fetch").mockImplementation(()=>{
    //     //     Promise.resolve()
            
    //     // })//cos nie dziala dlaczego??
    //     const {getByRole,getByLabelText}=render(<MovieForm movie={emptyMovie} movieCreated={movieCreated}/>);///pamietajmy o  destrukturyzacji w tescie!!
    //     const submitBtn=getByRole("button",{name:/create/i});
        // const titleInput=getByLabelText(/title/i);//mozna tez zaimportowac screen globalnie i uzywac screen.getByLabelText, zamiast importowac j.w.
        // const descriptionInput=getByLabelText(/description/i)
        // fireEvent.change(titleInput,{target:{value:"Title1"}})
        // fireEvent.change(descriptionInput,{target:{value:"Description1"}})
    //     fireEvent.click(submitBtn);
    //     // await wait(()=>{
            
    //     //     // expect(movieCreated.mock.calls)
    //     // })
    //     //zamiasdt setTimeout , mozna wykoszystac async wait!!, klikania its sa asynch!!
    //     // await wait(()=>{
    //     // expect(updateMovie).toBeCalledTimes(1)//ta funkcja akurat jest promisowa , wiec trzeba tez zmokowac tego fetch promise!!
    //     // })
    //    setTimeout(()=>{
    //     console.log(movieCreated.mock.calls)
    //    })

    // })
    test(" button should trigger Api call when create movie btn clicked",async()=>{//sprawdzamy obecnosc waznych elementow
        const createMovie=jest.fn();
        fetch.mockResponseOnce(JSON.stringify(movie))//korzysta z biblio jest-fetch-mock
        // jest.spyOn(global,"fetch").mockImplementation(()=>{
        //     Promise.resolve()
            
        // })//cos nie dziala dlaczego??
        const {getByRole,getByLabelText}=render(<MovieForm movie={emptyMovie} movieCreated={createMovie}/>);///pamietajmy o  destrukturyzacji w tescie!!
        const submitBtn=getByRole("button",{name:/create/i});
        const titleInput=getByLabelText(/title/i);//mozna tez zaimportowac screen globalnie i uzywac screen.getByLabelText, zamiast importowac j.w.
        const descriptionInput=getByLabelText(/description/i)
        fireEvent.change(titleInput,{target:{value:"Title1"}})
        fireEvent.change(descriptionInput,{target:{value:"Description1"}})
        fireEvent.click(submitBtn);
        //zamiasdt setTimeout , mozna wykoszystac async wait!!, klikania its sa asynch!!
        await waitFor(()=>{// niew wait!!
            console.log(createMovie.mock.calls)
        expect(createMovie).toBeCalledTimes(1);//ta funkcja akurat jest promisowa , wiec trzeba tez zmokowac tego fetch promise!!
        expect(createMovie.mock.calls[0][0]).toStrictEqual(movie)//ta metoda to porownania struktur obiektow!!
        expect(createMovie).toHaveBeenCalledWith(movie)
    })
    //    setTimeout(()=>{
    //     expect(createMovie).toBeCalledTimes(1)
    //    })

    })
})
