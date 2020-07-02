
  import { render, waitFor } from '@testing-library/react'  
  import { generateImage } from 'jsdom-screenshot'
  import { createBrowserHistory } from 'history'
  import { testProvider } from '../../testProvider'

  
  jest.setTimeout(30000)
  
  const history = createBrowserHistory()
  history.push('/')

  localStorage.setItem('loglevel:webpack-dev-server', 'INFO')
    
  it('runs the test', async () => {
    fetch
      .once(JSON.stringify({"movies":[{"_id":"5efd9be56947524af0f068af","title":"The Godfather","year":1972,"rating":9.2,"genres":["crime","drama"],"available":true},{"_id":"5efd9be56947524af0f068b0","title":"Jaws","year":1975,"rating":8,"genres":["adventure","thriller"],"available":true},{"_id":"5efd9be56947524af0f068b1","title":"The Texas Chain Saw Massacre","year":1974,"rating":7.5,"genres":["horror"],"available":false},{"_id":"5efd9be56947524af0f068b2","title":"Alien","year":1979,"rating":8.4,"genres":["horror","sci-fi"],"available":false},{"_id":"5efd9be56947524af0f068b3","title":"One Flew Over the Cuckoo's Nest","year":1975,"rating":8.7,"genres":["drama"],"available":true},{"_id":"5efd9be56947524af0f068b4","title":"Animal House","year":1978,"rating":7.5,"genres":["comedy"],"available":false},{"_id":"5efd9be56947524af0f068b5","title":"The Outlaw Josey Wales","year":1976,"rating":7.8,"genres":["western"],"available":false}]}), { headers: { 'Content-Type': 'application/json' } })
    
  
    render(testProvider())
    await waitFor(() => {})
  
    expect(fetch).toHaveBeenNthCalledWith(1, 'http://localhost:3001/movies', {"method":"get"})

    expect(fetch).toHaveBeenCalledTimes(1)

    const screenshot = await generateImage({ viewport: { width: 1500, height: 1000 } })
    expect(screenshot).toMatchImageSnapshot()

    fetch.resetMocks()
  })
