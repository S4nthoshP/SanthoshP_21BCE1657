const Player = () => {
  return (
    <div className='flex absolute w-full h-full'>
      {/* Keybindings Section */}
      <div className='absolute left-0 top-1/2 transform -translate-y-1/2 p-4 bg-green-500 rounded-xl flex flex-col gap-4'>
        {/* Instructions for selecting pieces */}
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <p>Click</p> 
          <div className='px-2 bg-black w-fit rounded-sm'>1</div>{' '}
          <p>to Select P1</p>
        </div>
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <p>Click</p> 
          <div className='px-2 bg-black w-fit rounded-sm'>2</div>{' '}
          <p>to Select P2</p>
        </div>
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <p>Click</p> 
          <div className='px-2 bg-black w-fit rounded-sm'>3</div>{' '}
          <p>to Select P3</p>
        </div>
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <p>Click</p> 
          <div className='px-2 bg-black w-fit rounded-sm'>4</div>{' '}
          <p>to Select H1</p>
        </div>
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <p>Click</p> 
          <div className='px-2 bg-black w-fit rounded-sm'>5</div>{' '}
          <p>to Select H2</p>
        </div>
        {/* Instruction for clearing selection */}
        <div className='font-bold text-lg pb-1 flex flex-row gap-2'>
          <div>Press</div>
          <div className='px-2 bg-black w-fit rounded-sm'>Esc</div>
          <p>to clear</p>
        </div>
      </div>

      {/* Example Section */}
      <div className='absolute right-0 top-1/2 transform -translate-y-1/2 p-4 bg-red-500 rounded-xl flex flex-col font-bold text-lg gap-2'>
        {/* Example of moving H2 to FL */}
        <p>For Example: To move H2 to FL</p>
        <div className='flex gap-2'>
          <div>1. Press</div>
          <div className='px-2 bg-black w-fit rounded-sm'>5</div>
        </div>
        <div className='flex gap-2'>
          <div>2. Press</div>
          <div className='px-2 bg-black w-fit rounded-sm'>F</div>
        </div>
        <div className='flex gap-2'>
          <div>3. Press</div>
          <div className='px-2 bg-black w-fit rounded-sm'>L</div>
        </div>
        <div className='flex gap-2'>
          <div>4. Press</div>
          <div className='px-2 bg-black w-fit rounded-sm'>Enter</div>
        </div>
      </div>
    </div>
  );
};

export default Player;
