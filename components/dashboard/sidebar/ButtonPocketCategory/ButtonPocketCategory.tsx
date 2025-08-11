'use client'

interface ButtonPocketCategoryProps{
    icon:string,
    name:string
}

export const ButtonPocketCategory = ({icon,name}:ButtonPocketCategoryProps) =>{

    return <button>
<img src={`/joypixels/${icon}.png`}/>
{name}
    </button>
}