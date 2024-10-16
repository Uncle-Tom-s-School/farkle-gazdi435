
export type diceProp = {
    ertek: number
}

const dice = (prop: diceProp) => {
  return (
    <div>{prop.ertek}</div>
  )
}

export default dice