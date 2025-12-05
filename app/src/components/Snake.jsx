import { useEffect, useRef } from "react";

export default function Snake({ visible, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    let x=10,y=10,vx=1,vy=0,foodX=15,foodY=15,trail=[],tail=5;

    function game() {
      x+=vx; y+=vy;
      if (x<0) x=59; if (x>59) x=0;
      if (y<0) y=59; if (y>59) y=0;

      ctx.fillStyle="black";
      ctx.fillRect(0,0,600,600);

      ctx.fillStyle="lime";
      for (let t of trail) ctx.fillRect(t.x*10,t.y*10,10,10);

      trail.push({x,y});
      while (trail.length > tail) trail.shift();

      if (x === foodX && y === foodY) {
        tail++;
        foodX = Math.floor(Math.random()*20);
        foodY = Math.floor(Math.random()*20);
      }

      ctx.fillStyle="red";
      ctx.fillRect(foodX*10, foodY*10, 10, 10);
    }

    const h = (e)=> {
      if(e.key==="ArrowUp") vy=-1,vx=0;
      if(e.key==="ArrowDown") vy=1,vx=0;
      if(e.key==="ArrowLeft") vx=-1,vy=0;
      if(e.key==="ArrowRight") vx=1,vy=0;
      if(e.key==="Escape") onClose();
    };
    // Empêche les flèches de scroller la page pendant le jeu
    const preventScroll = (e) => {
     const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"];
     if (keys.includes(e.key)) {
    e.preventDefault();
  }
};

window.addEventListener("keydown", preventScroll);

    window.addEventListener("keydown", h);
    const interval = setInterval(game, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", h);
      window.removeEventListener("keydown", preventScroll);

    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    

    <div style={{
      position:"fixed",
      top:"50%", left:"50%",
      transform:"translate(-50%,-50%)",
      background:"#111",
      padding:"10px",
      borderRadius:"8px",
      zIndex:9999
    }}>
      <button 
        onClick={onClose}
        style={{
          position:"absolute",
          top:"-10px",
          right:"-10px",
          background:"red",
          color:"white",
          border:"none",
          padding:"5px 8px",
          cursor:"pointer",
          borderRadius:"50%"
        }}
      >
        X
      </button>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={600} 
        style={{ border:"1px solid white" }} 
      />
    </div>
  );
}
