function show_hide(id){
    const display = document.getElementById(id).style.display
    document.getElementById(id).style.display = display === 'block' ? 'none' : 'block'
}