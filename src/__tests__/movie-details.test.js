import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MovieDetails from '../components/movie-details'


const movieDetails={title:"titanic",description:"nice",year:1997,avg_rating:5,no_of_ratings:10}
describe("Movie Details component",()=>{
    it("should match the snapshot",()=>{
        const {container}=render(<MovieDetails movie={movieDetails}></MovieDetails>)
        expect(container).toMatchSnapshot()//tworzy sie plik ze snapszotem twgo kompenentu,przy pierwszym 
        //puszczeniu testa, po kolejnym testowNiu go juz porownuje , jesli zajda jakies zmiany to test failed
    })//mozemy update : u//gonoralnie sluzy do sledzenia zmian!!jak chcemy pilnowac zeby cos sie nie zmienialo 
test("should display title and description",()=>{
    const {queryByText}=render(<MovieDetails movie={movieDetails}/>);
    expect(queryByText(movieDetails.title)).toBeTruthy()
    expect(queryByText(movieDetails.description)).toBeTruthy()//slózy do spr czy dane sa uzyte w komponencie
    //expect(queryByText(movieDetails.year)).toBeTruthy()-->to nie przejdzie bo w komponencie nie uzywa sie year!
})//jesli nie podpowiada tych metod to npm i -D @types/jest
test('should display orange stars in numbers',()=>{
    const {container}=render(<MovieDetails movie={movieDetails}/>);
    const orangeStars=container.querySelectorAll('.orange');
    console.log(orangeStars.length +" length")
    expect(orangeStars.length).toBe(movieDetails.avg_rating)//sprawdzam czy bedzie sie wyswietlalo zgodnie z propsami!
})
test("should display no of ratings",()=>{
        const {getByTestId}=render(<MovieDetails movie={movieDetails}/>);//czasem trezba stworzyc spana z 
        //atrybutem data do celow testowych zeby wyszukac elementu na stronie 
        expect(getByTestId("no-ratings").innerHTML).toBe(`(${movieDetails.no_of_ratings})`)
})
test("should highlight the stars",()=>{
    const {container}=render(<MovieDetails movie={movieDetails}/>);
    const stars=container.querySelectorAll(".rate-container svg");
    stars.forEach((el,id)=>{
        fireEvent.mouseOver(el); ///odpalamy eventy!
        const highlighted=container.querySelectorAll(".purple");
    expect(highlighted.length).toBe(id+1)
    })
    stars.forEach((el,id)=>{//node list!! for each, length
        fireEvent.mouseOut(el); 
        const highlighted=container.querySelectorAll(".purple");
    expect(highlighted.length).toBe(0)
    })
    
})
test("click star should triger function to update ",()=>{
    const loadMovie=jest.fn()//mocking, fejkowa funkcja , zeby sprawdzic ile razy kliknieta
    //(tyle razy ma sie wywolac co ilosc klikanych elementow)
    const {container}=render(<MovieDetails movie={movieDetails} updateMovie={loadMovie}/>);
    const stars=container.querySelectorAll(".rate-container svg");
     stars.forEach(el=>{
        fireEvent.click(el)
     })
     setTimeout(()=>{
        expect(loadMovie).toBeCalled(5)
     })//opozniamy sprawdzanie, bo js nie czeka (event loop!)
}) 
})