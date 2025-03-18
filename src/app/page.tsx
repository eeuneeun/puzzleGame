"use client";

export default function Main() {
  // # 키보드 상하좌우 움직임 함수
  function keyboardMove(event: any) {
    const targetEl = event.target.parentElement.style;

    if (event.key === "ArrowDown") {
      let nowTop = Number(targetEl.top.replace("px", ""));
      targetEl.top = nowTop + 100 + "px";
    } else if (event.key === "ArrowUp") {
      let nowTop = Number(targetEl.top.replace("px", ""));
      targetEl.top = nowTop - 100 + "px";
      console.log(nowTop);
    } else if (event.key === "ArrowLeft") {
      let nowLeft = Number(targetEl.left.replace("px", ""));
      targetEl.left = nowLeft - 100 + "px";
      console.log(nowLeft);
    } else if (event.key === "ArrowRight") {
      let nowLeft = Number(targetEl.left.replace("px", ""));
      targetEl.left = nowLeft + 100 + "px";
      console.log(nowLeft);
    }
  }

  // useEffect(() => {
  //   return () => {
  //     console.log("useEffect");
  //   };
  // }, []);

  return (
    <div>
      <main className="boundary">
        <div className="me">
          <input type="text" id="me" onKeyDown={(e) => keyboardMove(e)} />
        </div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>20</div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>24</div>
        <div>25</div>
        <div>26</div>
        <div>27</div>
        <div>28</div>
        <div>29</div>
        <div>30</div>
        <div>31</div>
        <div>32</div>
        <div>33</div>
        <div>34</div>
        <div>35</div>
        <div>36</div>
        <div>37</div>
        <div>38</div>
        <div>39</div>
        <div>40</div>
        <div>41</div>
        <div>42</div>
        <div>43</div>
        <div>44</div>
        <div>45</div>
        <div>46</div>
        <div>47</div>
        <div>48</div>
        <div>49</div>
        <div>50</div>
        <div>51</div>
        <div>52</div>
        <div>53</div>
        <div>54</div>
        <div>55</div>
        <div>56</div>
        <div>57</div>
        <div>58</div>
        <div>59</div>
        <div>60</div>
        <div>61</div>
        <div>62</div>
        <div>63</div>
        <div>64</div>
        <div>65</div>
        <div>66</div>
        <div>67</div>
        <div>68</div>
        <div>69</div>
        <div>70</div>
        <div>71</div>
        <div>72</div>
        <div>73</div>
        <div>74</div>
        <div>75</div>
        <div>76</div>
        <div>77</div>
        <div>78</div>
        <div>79</div>
        <div>80</div>
      </main>
    </div>
  );
}
