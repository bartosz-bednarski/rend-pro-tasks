'use client'
import {Pocket} from '@/store/usePocketsStore'

interface ButtonPocketCategoryProps extends Pocket{
    active:boolean,
    onClick:()=>void;
}

export const ButtonPocketCategory = ({emoji,name,active,onClick,tasks}:ButtonPocketCategoryProps) =>{
   

    return <button onClick={onClick} className={`flex flex-row w-full py-1.5 px-2 justify-between ${active&&'bg-[#6529FE]'} items-center rounded-[6px] cursor-pointer`}>
        <div className={`flex flex-row gap-4 ${active?'text-white':'black'} font-medium items-center`}>
<img className='w-[16px] h-[16px]' src={`/joypixels/${emoji}.png`}/>
{name}
</div>
<span className={`w-[24px] h-[24px] ${active?'bg-[#754EFF]':'bg-gray-50'} rounded-[4px] text-[14px] font-normal ${active?'text-white':'text-[#595959]'} align-middle text-center`}>{tasks.length}</span>
    </button>
}