import { render, fireEvent, waitFor } from '@testing-library/react' 
  import { generateImage } from 'jsdom-screenshot'
  import { createBrowserHistory } from 'history'
  import { testProvider } from '../../testProvider'

  
  jest.setTimeout(30000)
  
  const history = createBrowserHistory()
  history.push('/')
  
  localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWQxMDg0OWRlZDhlZDAwNzkzNmE0ZDBiIiwiaWF0IjoxNTk5MDU1MTM3LCJleHAiOjE1OTkxNDE1Mzd9.sHsKeeWA3fyxLOrzGw0nblE0oZxUl7_QuCyO4seyvxM')
  localStorage.setItem('loglevel:webpack-dev-server', 'INFO')
  localStorage.setItem('expirationDate', '1599141537')
  localStorage.setItem('userId', '5d10849ded8ed007936a4d0b')
  
  it('runs the test', async () => {
    fetch
      .once(JSON.stringify({"movies":[{"_id":"5efd9be56947524af0f068af","title":"The Godfather","year":1972,"rating":9.2,"genres":["crime","drama"],"available":true},{"_id":"5efd9be56947524af0f068b0","title":"Jaws","year":1975,"rating":8,"genres":["adventure","thriller"],"available":true},{"_id":"5efd9be56947524af0f068b1","title":"The Texas Chain Saw Massacre","year":1974,"rating":7.5,"genres":["horror"],"available":false},{"_id":"5efd9be56947524af0f068b2","title":"Alien","year":1979,"rating":8.4,"genres":["horror","sci-fi"],"available":false},{"_id":"5efd9be56947524af0f068b3","title":"One Flew Over the Cuckoo's Nest","year":1975,"rating":8.7,"genres":["drama"],"available":true},{"_id":"5efd9be56947524af0f068b4","title":"Animal House","year":1978,"rating":7.5,"genres":["comedy"],"available":false},{"_id":"5efd9be56947524af0f068b5","title":"The Outlaw Josey Wales","year":1976,"rating":7.8,"genres":["western"],"available":false}]}), { headers: { 'Content-Type': 'application/json' } })
      .once(JSON.stringify({"movie":{"result":{"n":1,"nModified":1,"ok":1},"connection":{"_events":{},"_eventsCount":4,"id":22,"address":"127.0.0.1:27017","bson":{},"socketTimeout":360000,"monitorCommands":false,"closed":false,"destroyed":false,"lastIsMasterMS":0},"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1,"n":1,"nModified":1,"ok":1}}), { headers: { 'Content-Type': 'application/json' } })
      .once(JSON.stringify({"movies":[{"_id":"5efd9be56947524af0f068af","title":"The Godfather","year":1972,"rating":9.2,"genres":["crime","drama"],"available":true},{"_id":"5efd9be56947524af0f068b0","title":"Jaws Revenge","year":1975,"rating":8,"genres":["thriller","western","horror"],"available":true},{"_id":"5efd9be56947524af0f068b1","title":"The Texas Chain Saw Massacre","year":1974,"rating":7.5,"genres":["horror"],"available":false},{"_id":"5efd9be56947524af0f068b2","title":"Alien","year":1979,"rating":8.4,"genres":["horror","sci-fi"],"available":false},{"_id":"5efd9be56947524af0f068b3","title":"One Flew Over the Cuckoo's Nest","year":1975,"rating":8.7,"genres":["drama"],"available":true},{"_id":"5efd9be56947524af0f068b4","title":"Animal House","year":1978,"rating":7.5,"genres":["comedy"],"available":false},{"_id":"5efd9be56947524af0f068b5","title":"The Outlaw Josey Wales","year":1976,"rating":7.8,"genres":["western"],"available":false}]}), { headers: { 'Content-Type': 'application/json' } })
    
    const { getByTestId } = render(testProvider())
    
    await waitFor(() => {})
    
    fireEvent.click(getByTestId('view-5efd9be56947524af0f068b0'))
    
    fireEvent.click(getByTestId('titleInput'))
    
    fireEvent.change(getByTestId('titleInput'), { target: { value: 'Jaws Revenge' } })
    
    fireEvent.click(getByTestId('genre-input-western'))
    
    {
      // puppeteer workaround
      const checkbox = document.body.querySelector('[data-testid="genre-input-western"]')
      if (checkbox.checked) checkbox.setAttribute('checked', '')
      else checkbox.removeAttribute('checked')
    }
    
    fireEvent.click(getByTestId('genre-input-horror'))
    
    {
      // puppeteer workaround
      const checkbox = document.body.querySelector('[data-testid="genre-input-horror"]')
      if (checkbox.checked) checkbox.setAttribute('checked', '')
      else checkbox.removeAttribute('checked')
    }
    
    fireEvent.click(getByTestId('genre-input-adventure'))
    
    {
      // puppeteer workaround
      const checkbox = document.body.querySelector('[data-testid="genre-input-adventure"]')
      if (checkbox.checked) checkbox.setAttribute('checked', '')
      else checkbox.removeAttribute('checked')
    }
    
    fireEvent.click(getByTestId('saveMovieButton'))
    
    await waitFor(() => {})
    
    await waitFor(() => {})
    
    expect(fetch).toHaveBeenNthCalledWith(1, 'http://localhost:3001/movies', {"method":"get"})
    expect(fetch).toHaveBeenNthCalledWith(2, 'http://localhost:3001/movies/5efd9be56947524af0f068b0', {"method":"put","headers":{"Content-Type":"application/json"},"body":"{\"title\":\"Jaws Revenge\",\"year\":1975,\"rating\":8,\"genres\":[\"thriller\",\"western\",\"horror\"],\"available\":true}"})
    expect(fetch).toHaveBeenNthCalledWith(3, 'http://localhost:3001/movies', {"method":"get"})
    
    expect(fetch).toHaveBeenCalledTimes(3)

    const screenshot = await generateImage({ viewport: { width: 1105, height: 377 } })
    expect(screenshot).toMatchImageSnapshot()

    fetch.resetMocks()
  })
