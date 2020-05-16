function q = plotaTabuleiro()
    
  xmin = 1; xmax = 1;
  ymin = 0; ymax = 3; 
  line([xmin xmax],[ymin ymax]); hold on;

  xmin = 2; xmax = 2;
  ymin = 0; ymax = 3; 
  line([xmin xmax],[ymin ymax]); hold on;
    
  ymin = 1; ymax = 1;
  xmin = 0; xmax = 3; 
  line([xmin xmax],[ymin ymax]); hold on;
    
  ymin = 2; ymax = 2;
  xmin = 0; xmax = 3; 
  line([xmin xmax],[ymin ymax]); hold on;

  axis off;
  
q = 1;
  
endfunction
