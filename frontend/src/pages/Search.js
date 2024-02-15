import React from 'react';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/sidebar/Sidebar';


const Searchpage = () => {
  return (
    <div>
    <Sidebar />
    <div className='flex flex-column items-center'>
      	<h1 className='f1 mt3 mb1'>FLASHY</h1>
    	<h2 className='f2 mt1'>Search</h2>    
    </div>
    <div className='flex flex-column items-center'>
      	<Searchbar />

    </div>
  </div>
  );
};

export default Searchpage;
