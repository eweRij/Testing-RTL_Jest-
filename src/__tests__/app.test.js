import React from 'react'
import { render, fireEvent ,screen,act,waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import App from '../App'
global.fetch= require('jest-fetch-mock')

const movies=[
    {id:1,title:"titanic",description:"nice",year:1997,avg_rating:5,no_of_ratings:10},
    {id:2,title:"avatar",description:"nice",year:1997,avg_rating:5,no_of_ratings:10}
]

describe("App component",()=>{
    it("Should display and hide loading",async ()=>{
        fetch.mockResponseOnce(JSON.stringify(movies))
    act(() => {
        render(<App />);
      });
    expect(screen.getByTestId("loading")).toBeTruthy()
    await waitFor(()=> screen.getByTestId("list"))
    expect(screen.queryByTestId("loading")).toBeFalsy()//getBy jesli nie ma elementu zwraca err,
    // query natomiast null wiec lepiej uzyc w tym przypadku!!
       
    })
    it("Should display error",async ()=>{
        fetch.mockResponseOnce(null,{status:500})//mokujemy error , w tym przypadku server error
    act(() => {
        render(<App />);//renderujemy komponent
      });
      expect.assertions(2)//sprawdza ilosc asercji , czyli ile expecrtow zrobilismy , dobre w asynchronicznych
    expect(screen.getByTestId("loading")).toBeTruthy()//przejdzie bo wpierw sie wswietli jak sie dane laduja
    await waitForElementToBeRemoved(()=>screen.getByTestId("loading"))//czekamy az loading sie usunie
    expect(screen.getByTestId("error")).toBeTruthy()// error sie wyswietla jak loading przestaje sie wyswietlac
  
       
    })
    it("Should display movies list",async ()=>{
        fetch.mockResponseOnce(JSON.stringify(movies))//mokujemy error , w tym przypadku server error
    act(() => {
        render(<App />);//renderujemy komponent
      });
      expect.assertions(3)//sprawdza ilosc asercji , czyli ile expecrtow zrobilismy , dobre w asynchronicznych
    expect(screen.getByTestId("loading")).toBeTruthy()//przejdzie bo wpierw sie wswietli jak sie dane laduja
    await waitForElementToBeRemoved(()=>screen.getByTestId("loading"))//czekamy az loading sie usunie
    const list=screen.getByTestId("list")
    expect(list).toBeTruthy()// list sie wyswietla jak loading przestaje sie wyswietlac
    expect(list.children.length).toBe(movies.length)
       
    })
    it("Should clicked btn display form",async ()=>{
        fetch.mockResponseOnce(JSON.stringify(movies))//mokujemy error , w tym przypadku server error
    act(() => {
        render(<App />);//renderujemy komponent
      });
      expect.assertions(2)//sprawdza ilosc asercji , czyli ile expecrtow zrobilismy , dobre w asynchronicznych
    await waitForElementToBeRemoved(()=>screen.getByTestId("loading"))//czekamy az loading sie usunie
    const btn=screen.getByRole("button",{name:/new movie/i});
    expect(btn).toBeTruthy()
    fireEvent.click(btn);
    await waitFor(()=>expect(screen.getByTestId("movie-form")).toBeTruthy())
       //oczywiscie musimy dodac do komponentow/elementow odpowiednie data-testid zeby to dzialalo

})
it("Should displaymovie details",async ()=>{
    fetch.mockResponseOnce(JSON.stringify(movies))//mokujemy error , w tym przypadku server error
act(() => {
    render(<App />);//renderujemy komponent
  });
await waitForElementToBeRemoved(()=>screen.getByTestId("loading"))//czekamy az loading sie usunie
const headings=screen.getAllByTestId("heading");

// fireEvent(headings[0])  
// expect(screen.getByText(movies[0].description).toBeTruthy())
   
})
})//generalnie sprawdzam jak wyswietlane sa elementy w zaleznosci od  fazy pobrania danych 