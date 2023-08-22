from flask import Flask, request, jsonify
import fastf1
from flask_cors import CORS  
from fastf1 import plotting
from matplotlib import pyplot as plt
from matplotlib.pyplot import figure
from matplotlib.collections import LineCollection
from matplotlib import cm
import numpy as np
import pandas as pd
import io
import base64
import fastf1.plotting
fastf1.plotting.setup_mpl(misc_mpl_mods=False)

app = Flask(__name__)
CORS(app)

@app.route('/get_race_image', methods=['GET'])
def get_race_image():
    race_name = request.args.get('race')
    
   
    session = fastf1.get_session(2023, race_name, 'R')
    session.load(telemetry=False, weather=False)

    fig, ax = plt.subplots(figsize=(8.0, 4.9))
 
    for drv in session.drivers:
        drv_laps = session.laps.pick_driver(drv)

        abb = drv_laps['Driver'].iloc[0]
        color = fastf1.plotting.driver_color(abb)

        ax.plot(drv_laps['LapNumber'], drv_laps['Position'],
                label=abb, color=color)
   
    ax.set_ylim([20.5, 0.5])
    ax.set_yticks([1, 5, 10, 15, 20])
    ax.set_xlabel('Lap')
    ax.set_ylabel('Position')

    ax.legend(bbox_to_anchor=(1.0, 1.02))
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    
    plot_base64 = base64.b64encode(buffer.read()).decode()

    return jsonify({"plot_image": plot_base64})



@app.route('/create_json', methods=['POST'])
def create_json():
    driver_name = request.form.get('formName')
    session = fastf1.get_session(2023, driver_name, 'R')
    session.load(telemetry=False, weather=False)

    fig, ax = plt.subplots(figsize=(8.0, 4.9))
    # sphinx_gallery_defer_figures

    ##############################################################################
    # For each driver, get their three letter abbreviation (e.g. 'HAM') by simply
    # using the value of the first lap, get their color and then plot their
    # position over the number of laps.
    for drv in session.drivers:
        drv_laps = session.laps.pick_driver(drv)

        abb = drv_laps['Driver'].iloc[0]
        color = fastf1.plotting.driver_color(abb)

        ax.plot(drv_laps['LapNumber'], drv_laps['Position'],
                label=abb, color=color)
    # sphinx_gallery_defer_figures

    ##############################################################################
    # Finalize the plot by setting y-limits that invert the y-axis so that position
    # one is at the top, set custom tick positions and axis labels.
    ax.set_ylim([20.5, 0.5])
    ax.set_yticks([1, 5, 10, 15, 20])
    ax.set_xlabel('Lap')
    ax.set_ylabel('Position')
    # sphinx_gallery_defer_figures

    ##############################################################################
    # Because this plot is very crowed, add the legend outside the plot area.
    ax.legend(bbox_to_anchor=(1.0, 1.02))
    plt.tight_layout()

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)

    # Convert the plot to Base64 encoding
    plot_base64 = base64.b64encode(buffer.read()).decode()

    return jsonify({"plot_image": plot_base64})


if __name__ == '__main__':
    app.run(debug=True)
