<?php $vote = $_REQUEST['vote'];
//get content of json
$filename = "poll.json";
if (!file_exists($filename)) { // First time ever
$poll = [0, 0];

} else {

$poll = json_decode(file_get_contents($filename));
if (!$poll) $poll = [$hand,$clip];
}

$hand = $array[0];
$clip = $array[1];

if ($vote == 0) {
    $hand = $hand += 1;
}

if ($vote == 1) {
    $clip = $clip += 1;
}

// increment counter for vote
$poll[$vote] += 1;

//insert votes to json file
$fp = fopen($filename,"w");

file_put_contents($filename, json_encode($poll));
?>

<h2>Result:</h2>

<div class="row-align">
<div class="col full-width">
Hand Type:
<img src="poll.gif"
width='<?php echo(100*round($hand/($clip+$hand),2)); ?>'
height='20'>
<?php echo(100*round($hand/($clip+$hand),2)); ?>%
<p></p>
Clip Type:
<img src="poll.gif"
width='<?php echo(100*round($clip/($clip+$hand),2)); ?>'
height='20'>
<?php echo(100*round($clip/($clip+$hand),2)); ?>%
</div>
</div>