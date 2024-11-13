function ZoomOut(props: React.SVGProps<SVGSVGElement>){
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
  <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/>
</svg>

    
    )
    }
    
    export default ZoomOut